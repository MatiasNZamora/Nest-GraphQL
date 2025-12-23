import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';

@Resolver( () => Todo )
export class TodoResolver {

    constructor(
        private readonly todoService:TodoService
    ){}

    @Query( () => [ Todo ], { name: 'Todos'} )
    findAll(
        @Args() statusArgs : StatusArgs
    ):Todo[] {
        return this.todoService.findAll( statusArgs ); 
    };

    @Query( () => Todo, { name: 'Todo' } )
    findOne(
        @Args('id', { type: () => Int } ) id: number
    ){
        return this.todoService.findOne( id );
    };

    @Mutation( () => Todo, { name: 'CreateTodo'} )
    createTodo(
        @Args('CreateTodoInput') createTodoInput : CreateTodoInput
    ){
        return this.todoService.create( createTodoInput );
    };

    @Mutation( () => Todo, { name: 'UpdateTodo'} )
    updateTodo(
        @Args('UpdateTodoInput') updateTodoInput : UpdateTodoInput
    ){
        return this.todoService.update( updateTodoInput.id, updateTodoInput );
    };

    @Mutation( () => Boolean, { name: 'DeleteTodo'} )
    deleteTodo(
        @Args('id', { type: () => Int } ) id: number
    ){
        return this.todoService.delete(id);
    };

    // Aggregations
    @Query( () => Int,{ name: 'TotalTodos' } )
    TotalTodos():Number {
        return this.todoService.totalTodos
    };

    @Query( () => Int,{ name: 'CompletedTodos' } )
    completedTodo(){
        return this.todoService.completedTodos;
    };

    @Query( () => Int,{ name: 'pendingTodo' } )
    pendingTodo(){
        return this.todoService.pendingTodos;
    };

    @Query( () => AggregationsType, { name: 'aggregation' } )
    aggregation():AggregationsType{
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodoCompleted: this.todoService.totalTodos,
        };
    };

};