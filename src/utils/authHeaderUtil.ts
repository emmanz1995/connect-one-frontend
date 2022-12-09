
export default function authHeader() {
  const currentUser = JSON.parse(localStorage.getItem('user') as any);

  if(currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
  
}