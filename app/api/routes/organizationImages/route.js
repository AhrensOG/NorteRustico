import { Organization, OrganizationImages } from "@/db/models/models";

export async function POST(req) {
  try {
    const { organizationId, images } = await req.json();

    if (!organizationId || !images || images.length === 0) {
      return Response.json(
        "Organization ID and a non-empty array of images are required",
        { status: 400 }
      );
    }

    const organization = await Organization.findByPk(organizationId);
    if (!organization) {
      return Response.json(
        `Organization with ID ${organizationId} does not exist`,
        { status: 404 }
      );
    }

    const newImages = [];
    for (const image of images) {
      const newImage = await OrganizationImages.create({
        name: image.name,
        url: image.url,
      });
      newImages.push(newImage);
    }
    await organization.addOrganizationImages(newImages);

    return Response.json("Organization successfully updated");
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

/////////////DELETE///////////////////
export async function PUT(req) {
  try {
    const { organizationId, images } = await req.json();

    if (!organizationId || !images || images.length === 0) {
      return Response.json(
        "Organization ID and a non-empty array of images are required",
        { status: 400 }
      );
    }

    const organization = await Organization.findByPk(organizationId);
    if (!organization) {
      return Response.json(
        `Organization with ID ${organizationId} does not exist`,
        { status: 404 }
      );
    }

    const imagesToRemove = [];
    for (const image of images) {
      const img = await OrganizationImages.findOne({ where: { id: image.id } });
      imagesToRemove.push(img);
    }
    await organization.removeOrganizationImages(imagesToRemove);

    await Promise.all(
      imagesToRemove.map(async (image) => {
        await image.destroy();
      })
    );

    return Response.json("Images successfully deleted from Organization");
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
