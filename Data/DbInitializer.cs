using Lab22.Models;
using System;
using System.Linq;

namespace lab22.Data
{
    public static class DbInitializer
    {
        public static void Initialize(MagazinContext context)
        {
            context.Database.EnsureCreated();

            if (context.Car.Any())
            {
                return;
            }

            var сonfiguration = new Configuration[]
{
                new Configuration {  Name="База"},
                new Configuration {  Name="Спорт"}

};
            foreach (Configuration co in сonfiguration)
            {
                context.Configuration.Add(co);
            }

            context.SaveChanges();

            var color = new Color[]
{
                new Color {  Name="Белый"},
                new Color {  Name="Черный"},
                new Color {  Name="Красный"},
                new Color {  Name="Желтый"},
                new Color {  Name="Синий"},
                new Color {  Name="Розовый"}

};
            foreach (Color col in color)
            {
                context.Color.Add(col);
            }

            context.SaveChanges();

            var car = new Car[]
               {
                new Car { Name="Huracán", Mark="Lamborghini",Cost=12260000,Speed=325,Power=610, ConfigurationFK=1,ColorFK=1,Visible=true }

              };
            foreach (Car c in car)
            {
                context.Car.Add(c);
            }

            context.SaveChanges();


            var order = new Order[]
               {
                new Order {UserFK="1",Cost=12260000,DateBegin= DateTime.Now}

              };
            foreach (Order pr in order)
            {
                context.Order.Add(pr);
            }

            context.SaveChanges();
        }
    }
}
