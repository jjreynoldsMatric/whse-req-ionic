import { EmployeeProvider } from "./employee";



let httpClientSpy: { get: jasmine.Spy };
let employeeService: EmployeeProvider;
describe("employeeProvider", () => {
    beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  employeeService = new EmployeeProvider(<any> httpClientSpy);
});
 
it('should return expected employees (HttpClient called once)', () => {
  const expectedEmployees: any[] =
    [{ empFull:"       7: WILLIAM FRAZIER", empDept: "301" }, { empFull: "      1: Dennis Haag", empDept: "308" }];
 
  httpClientSpy.get.and.returnValue((expectedEmployees));
 
  employeeService.loadEmployees();
     
  expect(employeeService.employees).toContain(expectedEmployees, 'expected employees')
  
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');

});

})


