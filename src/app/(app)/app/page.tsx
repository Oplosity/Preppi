import { redirect } from 'next/navigation';

/**
 * 
 * @returns redirect to quizzes
 */
export default function Page(){
    return redirect('/app/quizzes/');
}