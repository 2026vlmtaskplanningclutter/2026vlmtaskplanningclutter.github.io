git filter-repo --force --commit-callback '
  commit.author_name = b"Ghost"
  commit.author_email = b"Ghost@users.noreply.github.com"
  commit.committer_name = b"Ghost"
  commit.committer_email = b"Ghost@users.noreply.github.com"
'
git remote add origin https://github.com/2026vlmtaskplanningclutter/2026vlmtaskplanningclutter.github.io
git config user.name = "Ghost"
git config user.email = "Ghost@users.noreply.github.com"