export function formatTrainingData(type, data = [], t) {
  switch (type) {
    case "support":
      return data.map((item) => ({
        columns: [
          { type: "text", value: item.id },
          { type: "text", value: item.title },
          {
            type: "button",
            value: item.status,
            icon: false,
            color: "#FFD900",
            width: "70%",
          },
          { type: "text", value: item.updated_at },
          {
            type: "button",
            value: t("show-details"),
            icon: true,
            textColor: "#216ED7",
            color: "#fff",
            decoration: "underline",
            width: "100%",
          },
        ],
      }));

    case "admin-req":
      return data.map((item, index) => ({
        columns: [
          { type: "text", value: index + 1 },
          { type: "text", value: item.bundle_student.student_id },
          { type: "text", value: item.bundle_student.student.en_name },
          {
            type: "text",
            value: item.bundle_student.bundle.translations.title,
          },
          {
            type: "text",
            value: item.bundle_student.bundle.translations.title,
          },
          { type: "image", value: item.identity_attachment },
          { type: "image", value: item.identity_attachment },
          { type: "text", value: item.status },
          {},
          { type: "text", value: item.created_at },
          {
            type: "buttons",
            value1: t("accept"),
            value2: t("reject"),
            icon: false,
            color1: "#48BB78",
            color2: "#fc544b",
          },
        ],
      }));

      case "student-permission":
        return data.map((item, index) => ({
        columns: [
          { type: "text", value: index + 1 },
          { type: "text", value: item.buyer.full_name },
          { type: "text", value: item.item_title },
          {},
          // {
          //   type: "radio",
          //   value: item.access_to_purchased_item,
          // },
          // {
          
        ],
      }));

    default:
      return [];
  }
}
