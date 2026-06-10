export const model = {
  schema_version: "1.1",
  type_definitions: [
    {
      type: "user"
    },

    
    {
      type: "folder",
      relations: {
        owner: { this: {} },

        editor: {
          union: {
            child: [
              { this: {} },
              { computedUserset: { relation: "owner" } }
            ]
          }
        },

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
          owner: {
            directly_related_user_types: [{ type: "user" }]
          },
          editor: {
            directly_related_user_types: [{ type: "user" }]
          },
          viewer: {
            directly_related_user_types: [{ type: "user" }]
          }
        }
      }
    },

    // =========================
    // 📄 DOCUMENT (FILE)
    // =========================
    {
      type: "document",
      relations: {
        owner: { this: {} },

        editor: {
          union: {
            child: [
              { this: {} },
              { computedUserset: { relation: "owner" } }
            ]
          }
        },

        viewer: {
          union: {
            child: [
              { this: {} },
              { computedUserset: { relation: "editor" } },
              { computedUserset: { relation: "owner" } },

              // 🔥 inheritance from folder
              {
                tupleToUserset: {
                  tupleset: { relation: "parent" },
                  computedUserset: { relation: "viewer" }
                }
              }
            ]
          }
        },

        // 🔥 link file → folder
        parent: { this: {} }
      },

      metadata: {
        relations: {
          owner: {
            directly_related_user_types: [{ type: "user" }]
          },
          editor: {
            directly_related_user_types: [{ type: "user" }]
          },
          viewer: {
            directly_related_user_types: [{ type: "user" }]
          },

          parent: {
            directly_related_user_types: [{ type: "folder" }]
          }
        }
      }
    }
  ]
};