import { redirect } from 'next/navigation';

/**
 * 
 * @returns redirect to quiz question number 1
 */
export default function Page({ params }: { params: { id: string } }){
    return redirect(`/app/quiz/${params.id}/run/1`);
}