import Image from "next/image";
import Link from "next/link";
import BookLoanButton from "@/components/books/BookLoanButton";
import { booksApi } from "@/lib/books-api";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { requireUser } from "@/lib/require-user";

export const metadata = {
  title: "My Borrows",
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeZone: "Asia/Dhaka",
});

export default async function MyBorrowsPage() {
  await requireUser("/my-borrows");

  const token = await getTokenFromServer();
  const loans = await booksApi("/borrows", { token });

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">My Borrows</h1>

      {loans.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed p-6">
          <p className="text-muted-foreground">You have no active loans.</p>
          <Link href="/books" className="mt-3 inline-block text-sm underline">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th scope="col" className="p-4">Cover</th>
                <th scope="col" className="p-4">Title</th>
                <th scope="col" className="whitespace-nowrap p-4">Borrow Date</th>
                <th scope="col" className="whitespace-nowrap p-4">Return Date</th>
                <th scope="col" className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id} className="border-t">
                  <td className="p-4">
                    {loan.image && (
                      <Image
                        src={loan.image}
                        alt={`Cover of ${loan.title}`}
                        width={48}
                        height={64}
                        className="h-16 w-12 object-contain"
                      />
                    )}
                  </td>

                  <td className="p-4 font-medium">{loan.title}</td>

                  <td className="whitespace-nowrap p-4">
                    {dateFormat.format(new Date(loan.borrowDate))}
                  </td>

                  <td className="whitespace-nowrap p-4">
                    {dateFormat.format(new Date(loan.returnDate))}
                  </td>

                  <td className="whitespace-nowrap p-4">
                    <BookLoanButton
                      action="return"
                      id={loan._id}
                      title={loan.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}