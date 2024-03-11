import {
  Categories,
  Favourites,
  Order,
  Organization,
  OrganizationImages,
  Product,
  ProductImages,
  Qualifications,
  Tags,
  User,
} from "@/db/models/models";

export async function GET() {
  try {
    const organization = await Organization.findOne({
      include: OrganizationImages,
    });
    if (!organization) {
      return Response.json(false);
    }
    return Response.json(organization);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, whatsAppLink, instagramLink, facebookLink } =
      await req.json();

    if (!name || !whatsAppLink || !instagramLink || !facebookLink) {
      return Response.json("Missing Data / All fields are required", {
        status: 400,
      });
    }

    const newOrganization = await Organization.create({
      name,
      whatsAppLink,
      instagramLink,
      facebookLink,
    });

    return Response.json(newOrganization);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { organizationId, name, whatsAppLink, instagramLink, facebookLink } =
      await req.json();

    if (!organizationId) {
      return Response.json("Organization ID is required", {
        status: 400,
      });
    }

    const organizationToUpdate = await Organization.findByPk(organizationId);

    if (!organizationToUpdate) {
      return Response.json(`Product with ID ${organizationId} does not exist`, {
        status: 404,
      });
    }

    if (name) {
      organizationToUpdate.name = name;
    }
    if (whatsAppLink) {
      organizationToUpdate.whatsAppLink = whatsAppLink;
    }
    if (instagramLink) {
      organizationToUpdate.instagramLink = instagramLink;
    }
    if (facebookLink) {
      organizationToUpdate.facebookLink = facebookLink;
    }

    await organizationToUpdate.save();

    return Response.json('Organization successfully updated');
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
