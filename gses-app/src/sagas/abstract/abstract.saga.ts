import { Saga, SagaBuilder } from 'node-sagas';

abstract class AbstractSaga {
  getSagaDefinition<T>({
    name,
    invokeCallback,
    withCompensationCallback,
  }: {
    name?: string;
    invokeCallback: <T>(params: T) => Promise<void>;
    withCompensationCallback: <T>(params: T) => void;
  }): Saga<T> {
    const sagaBuilder = new SagaBuilder<T>();
    return sagaBuilder
      .step(name)
      .invoke(invokeCallback)
      .withCompensation(withCompensationCallback)
      .build();
  }
}

export { AbstractSaga };