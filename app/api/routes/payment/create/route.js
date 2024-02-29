import { preference } from "@/payment/mp";

const SERVER_URL_PAYMENT_NOTIFICATION =
  process.env.SERVER_ENDPOINT_PAYMENT_NOTIFICATION_URL;

export async function POST(req) {
  try {
    const { items, payer, orderId } = await req.json();

    const response = await preference.create({
      body: {
        items: items,
        payer: {
          email: payer.email,
          name: payer.name,
          surname: payer.surname,
          identification: {
            number: payer.dni,
            type: "DNI",
          },
          phone: {
            number: payer.phone,
          },
          address: {
            street_name: payer.street,
            street_number: payer.streetNumber,
            zip_code: payer.postalCode,
          },
        },
        back_urls: {
          success: "",
          pending: "",
          failure: "",
        },
        notification_url: `${SERVER_URL_PAYMENT_NOTIFICATION}`,
        metadata: {
          order: orderId,
          payer: {
            id: payer.id,
            email: payer.email,
            name: payer.name,
            surname: payer.surname,
            phone: {
              number: payer.phone,
            },
            address: {
              street_name: payer.street,
              street_number: payer.streetNumber,
              zip_code: payer.postalCode,
            },
          },
          items: items,
        },
      },
    });

    return Response.json(response);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
