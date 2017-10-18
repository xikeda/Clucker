// Sample Data

// A username
// An image_path
// A content
// A self-increment unique id
// created_at and updated_at timestamps

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cluck').del()
    .then(function () {
      const clucks = [{
        username: 'cluck_master',
        content: 'Q: What happens when a hen eats gunpowder? A: She lays hand gren-eggs! #roosterjokes #greneggs'
      },
      {
        username: 'cluck_master',
        content: "#kale #chips #tattooed whatever paleo. Woke paleo kitsch chambray #letterpress shoreditch actually. Banjo unicorn humblebrag intelligentsia, polariod"
      },
      {
        username: 'cluck_master',
        content: "Q: How does a chicken mail a letter to her friend? A: In a HEN-velope! #roosterjokes"
      }];

      return knex('cluck').insert(clucks);
    });
};
