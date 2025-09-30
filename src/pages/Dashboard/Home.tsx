import PageMeta from "../../components/common/PageMeta";
import VisitMetric from "../../components/ecommerce/VisitMetric";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="w-full">
        <div className="flex flex-col justify-center items-center w-full">
          <EcommerceMetrics />

          <VisitMetric />
        </div>
      </div>
    </>
  );
}
