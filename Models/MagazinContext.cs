using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lab22.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Lab22.Models
{
    public class MagazinContext : IdentityDbContext<User>
    {
        #region Constructor
        public MagazinContext(DbContextOptions<MagazinContext> options)
            : base(options)
        { }
        #endregion
       
        public virtual DbSet<Car> Car { get; set; }
   
        public virtual DbSet<Configuration> Configuration { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<Order_Line> Order_Line { get; set; }
        public virtual DbSet<Color> Color { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Configuration>(entity =>
            {
                entity.Property(e => e.Name).IsRequired();
      
            });
            modelBuilder.Entity<Color>(entity =>
            {
                entity.Property(e => e.Name).IsRequired();

            });

            modelBuilder.Entity<Car>(entity =>
            {
                entity.HasOne(d => d.Configuration)
                    .WithMany(p => p.Car)
                    .HasForeignKey(d => d.ConfigurationFK);
                entity.HasOne(d => d.Color)
                    .WithMany(p => p.Car)
                    .HasForeignKey(d => d.ColorFK);
            });
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasOne(d => d.User)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.UserFK);

            });
            modelBuilder.Entity<Order_Line>(entity =>
            {
                entity.HasOne(d => d.Car)
                   .WithMany(p => p.Order_Line)
                   .HasForeignKey(d => d.CarFK);
                entity.HasOne(d => d.Order)
                   .WithMany(p => p.Order_Line)
                   .HasForeignKey(d => d.OrderFK);

            });


        }
    }
}
