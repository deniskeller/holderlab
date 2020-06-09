export default function ({
  store,
  redirect
}) {
  if (store.state.auth) {
    if (store.state.is_redirect_dashboard) {
      return redirect('/dashboard');
    } else {
      return redirect('/create-new-portfolio/');
    }
  }
}
