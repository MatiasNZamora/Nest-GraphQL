import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query( () => String, { description: 'Hola Retorno de Hola mundo', name: 'hellow' } )
    helloWorld():string {
        return 'hola mundo'
    };

    @Query( () => Float, { name: 'RandomNumber' } )
    getRandomNumber():number {
        return Math.random() * 100
    };

    @Query( () => Int, { name: 'RandomFromZero', description: 'From zero to argument to (Default 6)' } )
    getRandomFromZeroTo( 
        @Args( 'to', { type: () => Int, nullable: true } ) to: number = 6
    ):number {
        return Math.floor( Math.random() * to );
    };

};