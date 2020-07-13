export const status = new Map([
  [201, { name: "Cửa hàng đã tạo", color: "info" }],
  [202, { name: "Cửa hàng đã chỉnh sửa", color: "info" }],
  [203, { name: "Cửa hàng đã hủy", color: "danger" }],

  [301, { name: "Kế toán chấp thuận", color: "success" }],
  [302, { name: "Kế toán yêu cầu chỉnh sửa", color: "warning" }],
  [303, { name: "Kế toán đã hủy", color: "danger" }],

  [101, { name: "Chủ đầu tư chấp thuận", color: "success" }],
  [102, { name: "Chủ đầu tư yêu cầu chỉnh sửa", color: "warning" }],
  [103, { name: "Chủ đầu tư đã hủy", color: "danger" }],

  [1, { name: "Hoàn tất", color: "success" }],
  [0, { name: "Bị hủy sau khi quyết toán", color: "danger" }]
]);
