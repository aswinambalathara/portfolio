# Deploying the portfolio

Push to `main` → [ci-cd.yml](../.github/workflows/ci-cd.yml) runs the checks, builds a `linux/arm64`
image on GitHub's ARM runner, pushes it to GHCR as `sha-<commit>`, and SSHes into the primary server,
where the server's shared `deploy.sh` pulls that tag, waits for the `/healthz` check and rolls back if
it fails. The workflow then checks the public site.

This folder holds **the portfolio's files only**. The server itself (deploy user, `deploy.sh`,
certbot, the Nginx catch-all, the port registry) is set up from the server config repo; do that
first. The portfolio's entry there: app `portfolio` on `primary`, port 3100.

| Server path | What | Owner / mode |
|---|---|---|
| `/opt/apps/portfolio/compose.yaml` | Live compose file, sent by CI on every deploy | `deploy` |
| `/opt/apps/portfolio/.env` | `TAG=sha-…` of the running version (`.prev` files hold the one before) | `deploy` |
| `/etc/nginx/sites-available/portfolio.conf`, `/etc/nginx/snippets/portfolio-tls.conf` | Reverse proxy, downloaded from this repo | `root` |
| `/etc/letsencrypt/live/portfolio/` | HTTPS certificate for all three hostnames, renewed by certbot's timer | `root` |

The site answers on `portfolio.aswin-ambalathara.space`, the bare domain `aswin-ambalathara.space`
and `www.aswin-ambalathara.space`. Its pages name `portfolio.` as the canonical URL (`site.url`), so
search engines treat them as one site.

The site has no secrets, so there is no env file on the server.

## DNS

At Hostinger:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `portfolio` | `130.210.36.159` | 300 |
| A | `@` (the bare domain) | `130.210.36.159` | 300 |
| CNAME | `www` | `aswin-ambalathara.space` | 300 |

Hostinger may already have an `A` or `AAAA` record on `@` (its parking page): delete those, so `@`
has only the record above. The `www` CNAME may already exist; keep it, it follows `@`. Leave `MX`
and `TXT` records alone; they don't affect the website.

Check: `nslookup` with `1.1.1.1` for `portfolio.aswin-ambalathara.space`, `aswin-ambalathara.space`
and `www.aswin-ambalathara.space` answers `130.210.36.159` for all three, and only that.

## One-time setup on the server

Run on the server as `ubuntu`. Step 4 downloads from `main`, so push this folder first.

**1. App folder**

```bash
sudo install -d -o deploy -g deploy -m 750 /opt/apps/portfolio
```

**2. Deploy key**, pinned so it can only deploy the portfolio. On your own machine, not the server:

```powershell
ssh-keygen -t ed25519 -C "portfolio-github-actions" -f $env:USERPROFILE\portfolio-deploy-key\portfolio-deploy
```

Press Enter twice for no passphrase. On the server:

```bash
echo 'restrict,command="/opt/deploy/deploy.sh --only portfolio" <contents of portfolio-deploy.pub>' |
  sudo tee -a /home/deploy/.ssh/authorized_keys >/dev/null
```

The private key goes into GitHub (below); delete the local key folder afterwards.

**3. HTTPS certificate** (needs all three names resolving; the server's catch-all answers the challenge)

```bash
sudo certbot certonly --webroot -w /var/www/html --cert-name portfolio \
  --deploy-hook "systemctl reload nginx" \
  -d portfolio.aswin-ambalathara.space -d aswin-ambalathara.space -d www.aswin-ambalathara.space
sudo certbot renew --dry-run
```

**4. Nginx**

```bash
base=https://raw.githubusercontent.com/aswinambalathara/portfolio/main/deploy/nginx
sudo curl -fsSL -o /etc/nginx/snippets/portfolio-tls.conf "$base/portfolio-tls.conf"
sudo curl -fsSL -o /etc/nginx/sites-available/portfolio.conf "$base/portfolio.conf"
sudo ln -s /etc/nginx/sites-available/portfolio.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## GitHub settings

**Settings → Environments → New environment `production`**, deployment branches limited to `main`:

| Kind | Name | Value |
|---|---|---|
| Secret | `DEPLOY_SSH_KEY` | Contents of the private key `portfolio-deploy` |
| Secret | `DEPLOY_KNOWN_HOSTS` | Output of `ssh-keyscan -t ed25519 130.210.36.159`, after checking its fingerprint is `SHA256:fqoQuFc1+3eaeqLEPc/TFbZBUbCToh+8Fw3WnlldjvU` |
| Variable | `DEPLOY_HOST` | `130.210.36.159` |

After the first build, open the `portfolio` package under your GitHub profile → Packages → Package
settings and set its visibility to **Public**, so the server can pull without a registry login. If
the first deploy failed to pull before that, re-run the failed job.

## Day to day

- **Deploy:** push to `main`.
- **Status / roll back** (on the server): `sudo -u deploy /opt/deploy/deploy.sh status portfolio`,
  or `rollback portfolio` to return to the previous version.
- **Logs:** `sudo docker logs -f portfolio-web-1`.
