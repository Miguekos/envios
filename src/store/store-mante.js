import { axiosInstance } from "boot/axios";
const state = {
  Proveedores: [],
  ProveedoresOne: [],
  FindId: [],
  FindControl: []
};

const mutations = {
  setProveedores(state, payload) {
    state.Proveedores = payload;
  },
  setProveedoresOne(state, payload) {
    state.ProveedoresOne = payload;
  },
  setFindId(state, payload) {
    state.FindId = payload
  },
  setFindControl(state, payload) {
    state.FindControl = payload
  }
};

const actions = {
  async callProvee({ commit }) {
    const response = await axiosInstance.get(`/mantenimiento/proveedores`);
    commit("setProveedores", response.data);
  },
  async callProveeId({ commit }, payload) {
    const response = await axiosInstance.get(
      `/mantenimiento/proveedores/${payload}`
    );
    commit("setProveedoresOne", response.data);
  },
  async addProvee({ commit }, payload) {
    const response = await axiosInstance.post(
      `/mantenimiento/proveedores`,
      payload
    );
    return response.data;
  },
  async delProvee({ commit }, payload) {
    const response = await axiosInstance.delete(
      `/mantenimiento/proveedores/${payload}`
    );
    return response.data;
  },
  async updateProvee({ commit }, payload) {
    const response = await axiosInstance.put(
      `/proveedores/${payload.id}`,
      payload.data
    );
    return response.data;
  },
  async callFindId({ commit }, payload) {
    const response = await axiosInstance.get(
      `/mantenimiento/filtros/${payload.tipo}/${payload.id}`,
      payload.data
    );
    commit("setFindId", response.data)
  },
  async callFindControl({ commit }, payload) {
    const response = await axiosInstance.get(
      `/mantenimiento/filtros/2/${payload}`,
      payload.data
    );
    commit("setFindControl", response.data)
  }
};

const getters = {
  getProvee(state) {
    return state.Proveedores;
  },
  getProveeOne(state) {
    return state.ProveedoresOne;
  },
  getFindId(state) {
    return state.FindId
  },
  getFindControl(state) {
    return state.FindControl
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
