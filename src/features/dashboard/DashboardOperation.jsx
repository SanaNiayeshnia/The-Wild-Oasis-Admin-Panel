import Filter from "../../ui/Filter";

function DashboardOperation() {
  return (
    <div>
      <Filter
        filterField="duration"
        options={[
          { title: "Last 7 days", value: "7" },
          { title: "Last 30 days", value: "30" },
          { title: "Last 90 days", value: "90" },
        ]}
      />
    </div>
  );
}

export default DashboardOperation;
