import React from 'react'
import { Card,CardHeader,CardContent,CardFooter } from '../ui/card';
import Header from '@/components/auth/Header';
import Social from '@/components/auth/Social';
import BackButton from '@/components/auth/BackButton';
interface CardWrapperProps{
    children:React.ReactNode;
    backButtonLabel:string;
    backButtonHref:string;
    headerLabel:string;
    showSocial?:boolean;
} 
function CardWrapper({
    children,
    backButtonLabel,
    backButtonHref,
    headerLabel,
    showSocial
}:CardWrapperProps) {
  return (
    <Card className='w-[400px] shadow-md'>
        <CardHeader>
            <Header label={headerLabel}/>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocial && <CardFooter>
            <Social/>
        </CardFooter>}
        <CardFooter>
            <BackButton label={backButtonLabel} href={backButtonHref}/>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper