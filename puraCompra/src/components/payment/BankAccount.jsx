import { HiExclamation } from 'react-icons/hi';
import { Table, Toast} from 'flowbite-react';

export default function BankAccount() {
  return (
    <div>
      <Toast className="w-full max-w-full">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
          <HiExclamation className="h-4 w-4" />
        </div>
        <div className="ml-3 text-sm font-normal whitespace-nowrap">
          Your order will be processed once we receive the funds.
        </div>
        <Toast.Toggle />
      </Toast>
        <div className="text-left">
            <h1 className="text-2xl font-bold mt-8">Bank Account</h1>
            <span className="block">Please transfer the payment to the bank account details shown below.</span>
            <Table className='striped border mt-6'>
              <Table.Head>
                <Table.HeadCell>Account number</Table.HeadCell>
                <Table.HeadCell>Bank</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>0056 8638 7922 09732</Table.Cell>
                  <Table.Cell className='hover:text-blue-700'>Banco de América Central S. A</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
        </div>


    </div>
  );
}
