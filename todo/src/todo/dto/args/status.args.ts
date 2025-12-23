import { IsOptional, IsBoolean } from 'class-validator';
import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class StatusArgs {
    
    @Field( () => Boolean, { description: 'Filtro de stado', nullable:true })
    @IsBoolean()
    @IsOptional()
    status?: boolean;

};