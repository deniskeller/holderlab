export default function ({
  store,
  redirect
}) {
  // console.log('fuf');
  // console.log(store.state.auth);
  if (!store.state.auth) {
    // return redirect('/landing-modal/hello');
    return redirect('/landing');
  }
}
