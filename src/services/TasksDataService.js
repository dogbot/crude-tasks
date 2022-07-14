import http from "../http-common";

class TasksDataService {
  getAll() {

    return http.get("/task/");
  }
  get(id) {
    return http.get(`/task/?id=${id}`);
  }
  create(data) {
    return http.post("/task", data);
  }
  update(id, data) {
    return http.patch(`/task/${id}`, data);
  }
  delete(id) {
    return http.delete(`/task/${id}`);
  }
  deleteAll() {
    return http.delete(`/task`);
  }
  findByTitle(title) {
    return http.get(`/task/?title=${title}`);
  }
}
export default new TasksDataService();
