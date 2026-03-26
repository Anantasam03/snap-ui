# Security Policy

## Reporting a Vulnerability

If you find a security issue in any snippet in this repo,
please **do not** open a public issue.

📧 Email: your@email.com
🔒 Please include steps to reproduce and impact details.

We'll respond within 48 hours.

---

### 3️⃣ GitHub Repo Settings (Do these after creating the repo)

Go to your repo → **Settings** and enable:

| Setting                         | Where               | Action                |
| ------------------------------- | ------------------- | --------------------- |
| Branch protection               | Settings → Branches | Protect `main` branch |
| Require PR reviews              | Branch rules        | Enable for `main`     |
| Secret scanning                 | Settings → Security | Enable                |
| Dependency alerts               | Settings → Security | Enable Dependabot     |
| Private vulnerability reporting | Security tab        | Enable                |

---

### 4️⃣ Branch Protection Rules

In **Settings → Branches → Add Rule** for `main`:

✅ Require a pull request before merging
✅ Require approvals (1)
✅ Dismiss stale pull request approvals
✅ Require status checks to pass
✅ Include administrators
