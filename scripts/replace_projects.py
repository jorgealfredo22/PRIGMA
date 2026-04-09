from pathlib import Path
p=Path('app/page.tsx')
s=p.read_text()
# Replace first two occurrences of the image src
s = s.replace('src="/images/prigma.jpeg"', '___TMP_IMG___', 1)
s = s.replace('src="/images/prigma.jpeg"', 'src="/uploads/mockup-all-framed(1).png"', 1)
s = s.replace('___TMP_IMG___', 'src="/uploads/mockup-all-framed.png"')
# Replace titles and descriptions (first occurrences only)
s = s.replace('Sistema ERP para Retail', 'BarberPro', 1)
s = s.replace('Desarrollo de un sistema completo de gestión para cadena de tiendas con módulos de inventario, ventas\n                  y CRM.', 'Sistema de gestión de citas para barberías modernas.', 1)
s = s.replace('App Móvil Financiera', 'ShopFlow', 1)
s = s.replace('Aplicación móvil para gestión financiera personal con integración a múltiples bancos y análisis de\n                  gastos.', 'Plataforma de ventas online optimizada para pequeñas empresas.', 1)
p.write_text(s)
print('updated')
