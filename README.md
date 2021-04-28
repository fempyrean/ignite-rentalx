# ignite-rentalx

# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro
Deve ser possível listar todas as categorias

**RN**
Não deve ser possível cadastrar dois carros com a mesma license_plate
// Não deve ser possível alterar a placa de um carro já cadastrado
O carro deve ser cadastrado como disponível por padrão
\*O usuário responsável pelo cadastro deve ser um usuário administrador

# Listagem de carro

**RF**
Deve ser possível listar os carros disponíveis
Deve ser possível listar todos os carros disponíveis por categoria
Deve ser possível listar todos os carros disponíveis por marca
Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RN**
O usuário não precisa estar logado no sistema

# Cadastro de especificação do carro

**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listrar todas as especificações
Deve ser possível listar todos os carros

**RN**
Não deve ser possível cadastrar uma espicificação para um carro não cadastrado.
Não deve ser possível cadastrar a mesma espeficicação mais de uma vez para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário administrador

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para o upload dos arquivos

**RN**
O usuário deve conseguir cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário administrador

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RNF**

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo carro
Ao realizer um aluguel, o status do carro deve ser alterado para indisponivel

# Devolução de carro

**RF**
Deve ser possível realizer a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
Ao realizar a devolução, deverá ser calculado o total do aluguel
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso
Caso haja multa, deverá ser somado ao total do aluguel

# Recuperação de senha

**RF**

- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**RN**

- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas
