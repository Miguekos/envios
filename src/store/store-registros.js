import { axiosInstance } from "boot/axios";
import { date } from "quasar";

let timeStamp = Date.now();
let formattedString = date.formatDate(timeStamp, "DD/MM/YYYY");
const newDate = date.addToDate(timeStamp, { days: -7})
let formattedString2 = date.formatDate(newDate, "DD/MM/YYYY");
// console.log(formattedString2)

const state = {
  Dashboard: [],
  Historico: [],
  Registros: [],
  RegistrosForUser: [],
  ClienteOne: "",
  RegistrosCount: null,
  search: "",
  selectAsung: [],
  ini_date: formattedString,
  fin_date: formattedString,
  ini_date_dash: formattedString2,
  fin_date_dash: formattedString
};

const mutations = {
  setDashboard(state, payload) {
    state.Dashboard = payload;
  },
  setHistorico(state, payload) {
    state.Historico = payload;
  },
  setRegistros(state, payload) {
    state.Registros = payload;
  },
  setRegistrosForUser(state, payload) {
    state.RegistrosForUser = payload;
  },
  setRegistrosCount(state, payload) {
    state.RegistrosCount = payload;
  },
  setClienteOne(state, payload) {
    state.ClienteOne = payload;
  },
  setSearch(state, payload) {
    state.search = payload;
  },
  setSelectAsung(state, payload) {
    state.selectAsung = payload;
  },
  FechaIni(state, payload) {
    state.ini_date = payload;
  },
  FechaFin(state, payload) {
    state.fin_date = payload;
  }
};

const actions = {
  async callDashboard({ commit }, payload) {
    console.log("callDashboard");
    const response = await axiosInstance.get(
      `/reporte/dashboard?ini_date=${payload.ini_date}&fin_date=${payload.fin_date}`
    );
    // console.log(response.data);
    commit("setDashboard", response.data);
    // return response.data;ahaha
  },
  async callHistorico({ commit }) {
    // console.log("callDashboard");
    const response = await axiosInstance.get(`/reporte/historico`);
    commit("setHistorico", response.data);
  },
  async setHistorico({ commit }) {
    const response = await axiosInstance.get(`/reporte/historico?ini_date=${formattedString}`);
    return response.data;
  },
  setFechaIni({ commit }, payload) {
    commit("FechaIni", payload);
  },
  setFechaFin({ commit }, payload) {
    commit("FechaFin", payload);
  },
  async callRegistros({ commit }) {
    console.log("callRegistros");
    const response = await axiosInstance.get(`/registros`);
    // console.log(response.data);
    commit("setRegistros", response.data);
    // return response.data;ahaha
  },
  async callRegistrosForUser({ commit }, payload) {
    console.log("callRegistrosForUser");
    // console.log(payload);
    const response = await axiosInstance.get(
      `/registros/?dni=${payload.dni}&estado=${payload.estado}&ini_date=${payload.ini_date}&fin_date=${payload.fin_date}`
    );
    // console.log(response.data);
    commit("setRegistrosForUser", response.data);
    // return response.data;ahaha
  },
  async callRegistrosCount({ commit }) {
    console.log("callRegistros");
    const response = await axiosInstance.get(`/registros/count`);
    // console.log(response.data);
    commit("setRegistrosCount", response.data);
    // return response.data;ahaha
  },
  async addRegistro({ commit }, payload) {
    console.log("addRegistro");
    // console.log(payload);
    const response = await axiosInstance.post(`/registros`, payload);
    console.log(response);
    // commit("setRegistros", response.data);
    return response.data;
  },
  async updateRegistro({ commit }, payload) {
    console.log("updateRegistro");
    // console.log(payload);
    const response = await axiosInstance.put(
      `/registros/${payload.id_}`,
      payload
    );
    // console.log(response);
    // commit("setRegistros", response.data);
    return response.data;
  },
  async updateRegistroQR({ commit }, payload) {
    console.log("updateRegistroQR");
    // console.log(payload);
    const response = await axiosInstance.put(
      `/registros/addqr/${payload.registro}`,
      payload
    );
    return response.data;
  },
  setSearch({ commit }, payload) {
    commit("setSearch", payload);
  },
  setSelect({ commit }, payload) {
    commit("setSelectAsung", payload);
  }
};

const getters = {
  taskFiltered: state => {
    let taskFiltered = {};
    if (state.search) {
      Object.keys(state.Registros).forEach(function(key) {
        let task = state.Registros[key],
          taskNameLowerCase = task.nombre.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          taskFiltered[key] = task;
        }
      });
      return taskFiltered;
    }
    return state.Registros;
  },
  getRegistros(state, getters) {
    let taskFiltered = getters.taskFiltered;
    let tasks = [];
    console.log("taskFiltered", taskFiltered);
    console.log("state.Registros", state.Registros);
    // return state.Registros;
    // let tasks = {};
    Object.keys(taskFiltered).forEach(function(key) {
      let task = taskFiltered[key];
      // console.log(task);
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    // return taskFiltered;
    return tasks;
  },
  RegistrosForUser(state) {
    console.log(state.RegistrosForUser);
    return state.RegistrosForUser;
  },
  getClienteOne(state) {
    console.log(state.ClienteOne);
    return state.ClienteOne;
  },
  getRegistrosCount(state) {
    console.log(state.RegistrosCount);
    return state.RegistrosCount;
  },
  getDashboard(state) {
    // console.log(state.RegistrosCount);
    return state.Dashboard;
  },
  getHistorico(state) {
    return state.Historico;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
