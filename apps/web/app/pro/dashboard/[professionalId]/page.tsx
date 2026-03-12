import { DashboardClient } from "./DashboardClient";

type Props = {
  params: {
    professionalId: string;
  };
};

export default function ProfessionalDashboardPage({ params }: Props) {
  return <DashboardClient professionalId={params.professionalId} />;
}
