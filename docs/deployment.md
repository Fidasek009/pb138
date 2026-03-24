# Deployment

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) configured against the target cluster
- [Helm 3](https://helm.sh/docs/intro/install/)
- GHCR write access:
  ```bash
  echo $GITHUB_TOKEN | docker login ghcr.io -u <username> --password-stdin
  ```

## Environments

| Environment | Namespace      | Branch       | Image tag            |
|-------------|----------------|--------------|----------------------|
| dev         | `pagepal-dev`  | any non-main | `sha-<short-commit>` |
| prod        | `pagepal-prod` | `main`       | `MAJOR.MINOR.PATCH`  |

The active environment is detected from the current git branch — no flags needed.

## Local development

```bash
make setup   # install deps + start PostgreSQL in Docker
make dev     # start API, web, and DB log panel via Turborepo TUI
```

## Deploying to the cluster

### First deploy only — pull Helm dependencies

```bash
make helm-deps
```

Re-run only when `helm/Chart.yaml` dependencies change.

### Dev deploy

From any non-main branch:

```bash
make docker-push   # build + push ghcr.io/.../pagepal-{api,web}:sha-<commit>
make deploy        # helm upgrade --install → pagepal-dev
```

### Prod release

Run from your dev/feature branch when ready to ship:

```bash
make release VERSION=1.2.3
```

This merges the current branch to `main`, tags `v1.2.3`, and pushes. Then:

```bash
git checkout main
make docker-push   # builds ghcr.io/.../pagepal-{api,web}:1.2.3
make deploy        # helm upgrade --install → pagepal-prod
```

Both `make docker-push` and `make deploy` fail if there is no semver tag on HEAD, preventing accidental prod deploys without a version.
