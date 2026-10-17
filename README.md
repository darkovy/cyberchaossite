# Cyber Chaos website

Production: https://cyberchaos.artovy.com/

Static HTML/CSS/JavaScript with local assets and a gameplay trailer. No build step or server dependencies. Roboman is revealed; the other heroes are mystery silhouettes.

## GitHub → cPanel

Source repository: https://github.com/darkovy/cyberchaossite.git

cPanel Git Version Control clones the deployment branch outside the web root. `.cpanel.yml` copies only the site files into `/home/cyberc/public_html/`.

For subsequent updates, commit changes here, open **cPanel → Git Version Control → Manage → Pull or Deploy**, choose **Update from Remote**, then **Deploy HEAD Commit**. cPanel reports the deployed commit so it can be matched to GitHub.

Never upload credentials, cPanel sessions, Git tokens, game source files or local player saves. Media files are game promotional artwork and footage. Existing trailer retained.
