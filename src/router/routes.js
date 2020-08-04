const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("components/Dashboard.vue") },
      { path: "imprimir", component: () => import("components/Imprimir.vue") },
      {
        path: "registros",
        component: () => import("pages/Registro/Index.vue")
      },
      {
        path: "/registrar",
        component: () => import("pages/Registro/Registro.vue")
      },
      { path: "upload", component: () => import("components/upload.vue") },
      { path: "/usuarios", component: () => import("pages/Users/Index.vue") },
      {
        path: "/profile/:id",
        component: () => import("pages/Users/Profile.vue")
      },
      {
        path: "/seguimiento",
        component: () => import("pages/Seguimiento/Index.vue")
      },
      {
        path: "/mantenimiento",
        component: () => import("pages/Mantenimiento/Index.vue")
      },
      {
        path: "/filtro",
        component: () => import("pages/Filtros/Index.vue")
      },
      {
        path: "/readqr",
        component: () => import("pages/QRreader/Index.vue")
      }
    ]
  },
  {
    path: "/auth",
    component: () => import("pages/Auth/PageAuth.vue")
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
