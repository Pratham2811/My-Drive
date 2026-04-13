export const model = {
  schema_version: "1.1",
  type_definitions: [
    {
      type: "user"
    },

    // 🔹 FOLDER
    {
      type: "folder",
      relations: {
        owner: { this: {} },
        editor: { this: {} },
        viewer: {
          union: {
            child: [
              { this: {} },
              { computedUserset: { relation: "editor" } },
              { computedUserset: { relation: "owner" } }
            ]
          }
        }
      },
      metadata: {
        relations: {
          owner: { directly_related_user_types: [{ type: "user" }] },
          editor: { directly_related_user_types: [{ type: "user" }] },
          viewer: { directly_related_user_types: [{ type: "user" }] }
        }
      }
    },

    // 🔹 DOCUMENT
    {
      type: "document",
      relations: {
        owner: { this: {} },
        editor: { this: {} },

        viewer: {
          union: {
            child: [
              { this: {} },
              { computedUserset: { relation: "editor" } },
              { computedUserset: { relation: "owner" } },

              // 🔥 IMPORTANT: inheritance
              {
                tupleToUserset: {
                  tupleset: { relation: "parent" },
                  computedUserset: { relation: "viewer" }
                }
              }
            ]
          }
        },

        // 🔥 link document → folder
        parent: { this: {} }
      },

      metadata: {
        relations: {
          owner: { directly_related_user_types: [{ type: "user" }] },
          editor: { directly_related_user_types: [{ type: "user" }] },
          viewer: { directly_related_user_types: [{ type: "user" }] },

          // 🔥 parent relation must accept folder
          parent: { directly_related_user_types: [{ type: "folder" }] }
        }
      }
    }
  ]
};