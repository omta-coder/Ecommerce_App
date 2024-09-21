import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id: "AWV194UWjXXyB3HgpZMo74ZvnQEoc3szKCuN5gwQMZ9EjxwnpM67tmB4o0RcbOIo26ygD7scqnF0j9LR",
  client_secret: "ELwJRGatUwLLbvNTZoSXvv_C-EsvpcNx13MU4Iz3LbzkDoTgbrYPUxdfcya-srF-R_3t9RoSe1h2kxh8",
});

export default paypal;
