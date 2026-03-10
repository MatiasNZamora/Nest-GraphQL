import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { ListService } from './list.service';
import { List } from './entities/list.entity';
import { ListItem } from 'src/list-item/entities/list-item.entity';
import { User } from 'src/users/entities/user.entity';

import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { ListItemService } from 'src/list-item/list-item.service';


@Resolver(() => List)
@UseGuards( JwtAuthGuard )

export class ListResolver {
  
  constructor( 
    private readonly listService: ListService,
    private readonly listItemService: ListItemService,
  ) {}

  @Mutation(() => List, { name: 'createList' })
  async createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() user: User
  ): Promise<List> {
    return this.listService.create( createListInput, user );
  };

  @Query(() => [List], { name: 'lists' })
  async findAll(
    @CurrentUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<List[]> {
    return this.listService.findAll( user, paginationArgs, searchArgs );
  };

  @Query(() => List, { name: 'list' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser() user: User
  ): Promise<List>{
    return this.listService.findOne( id, user );
  };

  @Mutation(() => List)
  updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() user: User
  ) {
    return this.listService.update(updateListInput.id, updateListInput, user);
  };

  @Mutation(() => List)
  removeList(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User

  ) {
    return this.listService.remove( id, user );
  };

  @ResolveField( () => [ListItem], { name: 'Items' } )
  getListItems(
    @Parent() list:List,
    @Args() PaginationArgs: PaginationArgs,
    @Args() seacrchArgs: SearchArgs,
  ): Promise<ListItem[]> {
    return this.listItemService.findAll( list, PaginationArgs, seacrchArgs );
  };

  @ResolveField( () => Number, { name: 'totalItems' } )
  async countListItemsByList(
  @Parent() list:List
  ):Promise<Number>{
    return this.listItemService.countListItemsByList( list );
  };
  
};
