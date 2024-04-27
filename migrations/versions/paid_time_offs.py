"""paid_time_offs

Revision ID: 4a00893b0025
Revises: 3f79412b2aa9
Create Date: 2024-04-27 01:27:45.731216

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4a00893b0025'
down_revision = '3f79412b2aa9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('paid_time_offs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('total_hours', sa.Integer(), nullable=True, default=0),
    sa.Column('used_hours', sa.Integer(), nullable=True, default=0),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('paid_time_offs')
    # ### end Alembic commands ###
