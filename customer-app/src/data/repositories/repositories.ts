import { Customer } from './customer/customer.repository.js';

interface IInitRepositoriesReturn {
  customer: Customer;
}

const initRepositories = (): IInitRepositoriesReturn => {
  const customer = new Customer({
    userCollection: [],
  });

  return { customer };
};

export { initRepositories, type Customer };