import { Metadata } from 'next';
import { ShowroomPage } from '@/components/showroom/ShowroomPage';

export const metadata: Metadata = {
  title: 'Virtual Showroom | Browse Countertops, Visualize & Get Estimates',
  description:
    'Browse premium granite, quartz, marble & quartzite countertops. Upload a photo of your kitchen and see stones in your space. Get instant estimates. No showroom visit needed.',
  openGraph: {
    title: 'Virtual Showroom | Counter Revolution',
    description:
      'See premium countertops in your actual kitchen or bathroom. Browse, visualize, and get a free estimate — all online.',
  },
};

export default function ShowroomRoute() {
  return <ShowroomPage />;
}
