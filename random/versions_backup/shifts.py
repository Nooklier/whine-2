"""shifts

Revision ID: cf59d645dd4a
Revises: 4a00893b0025
Create Date: 2024-04-27 07:51:10.040165

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'cf59d645dd4a'
down_revision = '4a00893b0025'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('shifts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer()),
    sa.Column('shift_date', sa.Date(), nullable=False),
    sa.Column('shift_start', sa.Time, nullable=False),
    sa.Column('shift_end', sa.Time, nullable=False),
    sa.Column('available', sa.Boolean(), nullable=False, default=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'],),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shifts')
    # ### end Alembic commands ###
