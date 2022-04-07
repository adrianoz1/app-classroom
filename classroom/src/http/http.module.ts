import {
  ApolloDriver,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { CoursesService } from 'src/services/courses.services';
import { EnrollmentsService } from 'src/services/enrollments.services';
import { StudentsService } from 'src/services/students.services';

import { DatabaseModule } from '../database/database.module';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    CoursesResolver,
    EnrollmentResolver,
    StudentsResolver,
    EnrollmentsService,
    CoursesService,
    StudentsService,
  ],
})
export class HttpModule {}
