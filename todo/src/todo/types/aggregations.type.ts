import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'Todo quick Aggregation' })
export class AggregationsType {
    
    @Field( () => Int )
    total: number;

    @Field( () => Int )
    pending: number;
    
    @Field( () => Int )
    completed: number;

    @Field( () => Int, { deprecationReason: 'Tenemos una funcion que hace lo mismo' } )
    totalTodoCompleted: number;

};