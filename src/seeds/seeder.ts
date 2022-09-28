export interface ISeeder extends Object {
  isSeeded(): Promise<boolean>;
  run(): Promise<void>;
}
