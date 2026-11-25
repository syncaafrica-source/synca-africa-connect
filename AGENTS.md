<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the retired Lomé URL as an unnested redirect to `/conf` so existing bookmarks work without restoring the removed event page.
- Use the public `/auth` page for sign-in and inline editing; fetch editor data only after sign-in through authenticated server functions with server-validated admin roles, so public SSR never calls protected loaders.
- Validate all editable event content with the shared schema and persist it in the event content table; never derive edit privileges from browser state.
