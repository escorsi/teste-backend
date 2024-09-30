import IContainerDependencies from 'src/types/shared/containerDependencies';
import { PrismaClient } from '@prisma/client';
import IUserRepository, { IUserBody } from 'src/infra/@types/IUserRepository';
import AppError from 'src/domain/errors/AppError';

type Dependencies = Pick<IContainerDependencies, 'logger'>;

const prisma = new PrismaClient();

export default class UserRepository implements IUserRepository {
  private logger: Dependencies['logger'];

  constructor({ logger }: Dependencies) {
    this.logger = logger;
  }

  async findOrCreateAddress(userValidated: IUserBody) {
    this.logger.info(`UserRepository.findOrCreateAddress() - Looking for address`);

    let address = await prisma.address.findFirst({
      where: {
        postalCode: userValidated.address.postalCode,
        street: userValidated.address.street,
        number: userValidated.address.number,
      },
    });

    if (!address) {
      this.logger.info(`UserRepository.findOrCreateAddress() - Creating new address`);
      address = await prisma.address.create({
        data: {
          postalCode: userValidated.address.postalCode,
          street: userValidated.address.street,
          number: userValidated.address.number,
          complement: userValidated.address.complement || null,
          city: userValidated.address.city,
          district: userValidated.address.district,
          state: userValidated.address.state,
        },
      });
    }

    return address;
  }

  async insert(userValidated: IUserBody): Promise<IUserBody> {
    const callName = `${this.constructor.name}.insert()`;
    try {
      this.logger.info(`${callName} - inserting user into database`);

      const address = await this.findOrCreateAddress(userValidated);

      this.logger.info(`${callName} - Creating user`);
      const createdUser = await prisma.user.create({
        data: {
          name: userValidated.name,
          email: userValidated.email,
          confirmEmail: userValidated.confirmEmail,
          mobile: userValidated.mobile,
          phone: userValidated.phone || null,
          acceptedTerms: userValidated.acceptedTerms,
          address: {
            connect: { id: address.id },
          },
          individualUser: userValidated.personType === 'individual'
            ? {
                create: {
                  cpf: userValidated.cpf!,
                },
              }
            : undefined,
          companyUser: userValidated.personType === 'company'
            ? {
                create: {
                  cnpj: userValidated.cnpj!,
                  responsibleCpf: userValidated.responsibleCpf!,
                },
              }
            : undefined,
        },
        include: {
          address: true,
          individualUser: true,
          companyUser: true,
        },
      });
      
      if (!createdUser.address) {
        throw new AppError('Address could not be associated with the user');
      }

      const responseUser: IUserBody = {
        personType: userValidated.personType,
        cpf: userValidated.cpf || null,
        cnpj: userValidated.cnpj || null,
        responsibleCpf: userValidated.responsibleCpf || null,
        name: createdUser.name,
        mobile: createdUser.mobile,
        phone: createdUser.phone,
        email: createdUser.email,
        confirmEmail: createdUser.confirmEmail,
        address: {
          postalCode: createdUser.address.postalCode,
          street: createdUser.address.street,
          number: createdUser.address.number,
          complement: createdUser.address.complement || null,
          city: createdUser.address.city,
          district: createdUser.address.district,
          state: createdUser.address.state,
        },
        acceptedTerms: createdUser.acceptedTerms,
      };

      this.logger.info(`${callName} - User created successfully`);
      return responseUser;
    } catch (error) {
      this.logger.error(`${callName} - error: ${(error as Error).message}`);
      throw new AppError('Error inserting user');
    }
  }
}
