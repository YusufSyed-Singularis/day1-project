import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/'
})

export async function userQuery() {
  const resp = await api.get('/users');
  return resp.data;
}

export async function userCreate(email: string, name?: string) {
  const resp = await api.post('/user', { email, name });
  return resp.data;
}

export async function userDelete(id: number) {
    const resp = await api.delete(`/user/${id}`);
    return resp.data;
}