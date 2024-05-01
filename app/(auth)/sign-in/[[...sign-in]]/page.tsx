import Footer from '@/components/Footer'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
    return (
        <main className='flex flex-col h-screen w-full items-center justify-center'>
            <SignIn />
            <Footer />
        </main>
    )
}

export default SignInPage