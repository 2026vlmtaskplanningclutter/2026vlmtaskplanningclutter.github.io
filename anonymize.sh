case "${1:-}" in
  reset)
    git filter-repo --force --commit-callback '
      commit.author_name = b"Ghost"
      commit.author_email = b"Ghost@users.noreply.github.com"
      commit.committer_name = b"Ghost"
      commit.committer_email = b"Ghost@users.noreply.github.com"
    '
    git remote add origin https://github.com/2026vlmtaskplanningclutter/2026vlmtaskplanningclutter.github.io
    git config user.name "Ghost" --replace-all
    git config user.email "Ghost@users.noreply.github.com" --replace-all
    echo "Repository completely anonymized 👻"
    ;;
  fix_user)
    git config user.name "Ghost" --replace-all
    git config user.email "Ghost@users.noreply.github.com" --replace-all
    echo "User and email anonymized 👻"
    ;;
  *)
    echo "Usage: $0 {reset|fix_user}"
    exit 1
    ;;
esac