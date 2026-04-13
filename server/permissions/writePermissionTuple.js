export async function addAccess({ userId, relation, type, id }) {
  try {
    if (!userId || !relation || !type || !id) {
      throw new Error("Invalid access parameters");
    }

    await openFga.write({
      writes: [
        {
          user: `user:${userId}`,
          relation,
          object: `${type}:${id}`,
        },
      ],
    });
  } catch (error) {
    console.error("FGA write failed:", error.message);
    throw new Error("Permission assignment failed");
  }
}
