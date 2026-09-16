---
"@tabler/core": patch
---

Fixed `.table-striped` and `.table-striped-columns` overriding a row or cell that sets its own background. A `<tr>` or `<td>` carrying `.bg-*`, `.table-*`, `.text-bg-*` or an inline `background` now keeps that background instead of being repainted by the stripe.
